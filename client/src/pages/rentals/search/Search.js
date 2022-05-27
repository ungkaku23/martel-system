import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ButtonGroup,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Select
} from "reactstrap";

import _ from "lodash";

import Autocomplete from "react-google-autocomplete";

import Widget from "../../../components/Widget/Widget";

import sTable from "../../../styles/Tables.module.scss";

import { 
  rentalSearchListing,
  rentalLoadSettings,
  rentalUpdateListing
} from "../../../actions/rentals";

import NSpinner from "../../../components/NSpinner/NSpinner";
import { jar } from "request";

const Search = (props) => {

  const [searchOption, setSearchOption] = useState({
    site: 'Zillow',
    homeType: 'single-family-home',
    priceMin: -1,
    priceMax: -1,
    beds: 0,
    baths: 0
  });

  const [cityState, setCityState] = useState("");

  const homeTypeList = [{
    label: 'Houses',
    value: 'single-family-home',
  }, {
    label: 'Town Homes',
    value: 'townhome'
  },{
    label: 'Apartments',
    value: 'apartments'
  }];

  const siteList = ['Zillow', 'Realtor'];

  const finishedBasementVals = ['Yes', 'No'];
  const garagesVals = ['None', '1', '2', '3+'];
  const poolhotTubVals = ['No', 'In Complex', 'Yes Hottub', 'Yes Pool', 'Yes Both'];
  const centralAirVals = ['Yes', 'No'];
  const applRequiredVals = ['0', '1', '2', '3', '4', '5'];
  const financingVals = ['Yes', 'No'];
  
  const [currentPage, setCurrentPage] = useState(1);

  const [prevListing, setPrevListing] = useState([]);
  const [prevSettings, setPrevSettings] = useState({});

  const updateCurrentPage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  }

  const doRentalSearchListing = (e) => {
    e.preventDefault();
    props.dispatch(rentalSearchListing({
      ...searchOption,
      cityState,
      pageIndex: currentPage
    }));
  }

  useEffect(() => {
    if (JSON.stringify(prevListing) !== JSON.stringify(props.listing)) {
      setPrevListing(props.listing);
      props.dispatch(rentalLoadSettings());
      
    }
  }, [props.listing]);

  useEffect(() => {
    if (JSON.stringify(prevSettings) !== JSON.stringify(props.settings)) {
      setPrevSettings(props.settings);
      rentalUpdateListingWithExtras("init-manual-auto");
    }
  }, [props.settings]);

  const fixedNumber = (val) => {
    return parseFloat(val).toFixed(3);
  }
  
  const setAutoValues = (property) => {
    
    let landlordRent = typeof property.landlord_rent === "string" 
                            ? parseInt(property.landlord_rent.split("-")[0].replace(/[^\d.-]/g, ''))
                            : property.landlord_rent;
    let airdnaAdr = isNaN(parseFloat(property.airdna_adr)) ? 0 : parseFloat(property.airdna_adr);
    let airdnaOccupancy = isNaN(parseFloat(property.airdna_occupancy)) ? 0 : parseFloat(property.airdna_occupancy);
    let estimateAirbnbRehab = isNaN(parseInt(property.square_footage)) ? 0 : parseInt(property.square_footage) * props.settings.avgAirdnaRehab;
    let firstSecurity = isNaN(landlordRent) ? 0 : landlordRent * props.settings.securityDepositRentMultiplier;
    let furnitureCost = isNaN(parseInt(property.square_footage)) ? 0 : parseInt(property.square_footage) * props.settings.avgFurnitureCost;
    let applianceCost = isNaN(parseInt(property.appl_required)) ? 0 : parseInt(property.appl_required) * props.settings.avgCostPerAppliance;
    let monthlyAirdnaIncome = ((airdnaAdr * airdnaOccupancy * 365) / 12);
    let additionalCosts = isNaN(parseInt(property.additional_costs)) ? 0 : parseInt(property.additional_costs);
    let airbnbFee = (parseFloat(monthlyAirdnaIncome) * props.settings.airbnbFee) / 12;
    let maintenance = ((parseFloat(monthlyAirdnaIncome) * (props.settings.ongoingMF / 100)) / 12);
    let insurance = (props.settings.shortTermRTInsurance / 12);
    let propertyManagement = ((monthlyAirdnaIncome) * props.settings.propertyManagement);
    let rentalTax = ((monthlyAirdnaIncome) * props.settings.averageRentalTax);
    let supplies = ((monthlyAirdnaIncome) * props.settings.avgSupplyBudget);
    let poolMaint = property.pool_hot_tub === 'Yes Pool' 
                    ? 80
                    : property.pool_hot_tub === 'Yes Hottub'
                      ? 80
                      : property.pool_hot_tub === 'Yes Hottub'
                        ? 120
                        : 0;
    let interest = property.financing === "Yes" 
                    ? ((furnitureCost * applianceCost * additionalCosts * 0.18) / 3)
                    : 0;
    let allInExpenses = (airbnbFee + maintenance + props.settings.internetUtility + props.settings.landscapeLawnSnow + insurance + propertyManagement + property.landlord_rent + rentalTax + supplies + poolMaint + interest);
    return {
      estimate_airbnb_rehab: estimateAirbnbRehab,
      first_security: firstSecurity,
      furniture_cost: furnitureCost,
      appliance_cost: applianceCost,
      monthly_airdna_income: monthlyAirdnaIncome,
      airbnb_fee: airbnbFee,
      maintenance: maintenance,
      insurance: insurance,
      property_management: propertyManagement,
      rental_tax: rentalTax,
      supplies: supplies,
      pool_maint: poolMaint,
      interest: interest,
      all_in_expenses: allInExpenses,
      monthly_cashflow: monthlyAirdnaIncome - allInExpenses,
      yearly_cashflow: (monthlyAirdnaIncome - allInExpenses) * 12,
      cash_on_cash_return: (((monthlyAirdnaIncome - allInExpenses) * 12) / (firstSecurity + furnitureCost + applianceCost + additionalCosts))
    }
  }

  const rentalUpdateListingWithExtras = (type, options = {}) => {
    if (type === "manual-auto") {
      const {link, field, value} = options;
      props.dispatch(rentalUpdateListing(props.listing.map(l => {
        if (l.link === link) {
          let temp = Object.assign({}, {
            ...l,
            [field]: field === "additional_costs" ? parseInt(value) : value
          });

          return {
            ...temp,
            ...setAutoValues(temp)
          };
        }

        return {
          ...l,
          ...setAutoValues(l)
        };
      })));
    } else if(type === "init-manual-auto") {
      props.dispatch(rentalUpdateListing(props.listing.map(l => {
        let temp = Object.assign({}, {
          ...l,
          finished_basement: finishedBasementVals[0],
          garages: garagesVals[0],
          pool_hot_tub: poolhotTubVals[0],
          central_air: centralAirVals[0],
          appl_required: applRequiredVals[0],
          financing: financingVals[0],
          additional_costs: 0
        });

        return {
          ...temp,
          ...setAutoValues(temp)
        };
      })));
    }
  }

  console.log('ls: ', props.listing);

  return (
    <div className="s-main-content" style={{overflow: props.isFetching ? "hidden" : "auto"}}>
      {
        props.isFetching
        ? <NSpinner />
        : null
      }
      <Widget className="widget-p-lg">
        <div className="headline-2 text-muted">
          Search For Rent
        </div>
        <div className="mt-4">
          <Form>
            <FormGroup row>
              <Label
                htmlFor="origin-site"
                sm={2}
              >
                Origin Site
              </Label>
              <Col sm={10}>
                <ButtonGroup>
                  {
                    siteList.map((o, idx) => {
                      return <Button
                              key={"sitelist" + idx}
                              color={searchOption.site === o ? 'primary' : 'secondary'}
                              onClick={() => {
                                setSearchOption({
                                  ...searchOption,
                                  site: o
                                });
                              }}
                            >
                              {o}
                            </Button>
                    })
                  }
                </ButtonGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                htmlFor="city"
                sm={2}
              >
                City
              </Label>
              <Col sm={10}>
                {/* <SearchLocationInput onChange={() => null} /> */}
                <Autocomplete
                  className="form-control"
                  apiKey={"AIzaSyDUJcZMahLqhK9vPGaiskdp-pfWtwTpySE"}
                  onPlaceSelected={(place) => {
                    let fAddrs = place.formatted_address.split(",");
                    setCityState(fAddrs[0] + ',' + fAddrs[1].replace(" ", ""));
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                htmlFor="city"
                sm={2}
              >
                Price
              </Label>
              <Col sm={10}>
                <div className="d-flex justify-content-between align-items-center">
                  <FormGroup>
                    <Label htmlFor="min">
                      Min
                    </Label>
                    <Input
                      id="min"
                      name="min"
                      type="number"
                      defaultValue={searchOption.priceMin === -1 ? 0 : searchOption.priceMin}
                      onChange={(e) => {
                        setSearchOption({
                          ...searchOption,
                          priceMin: parseInt(e.target.value)
                        });
                      }}
                    />
                  </FormGroup>
                  <div>To</div>
                  <FormGroup>
                    <Label htmlFor="max">
                      Max
                    </Label>
                    <Input
                      id="max"
                      name="max"
                      type="number"
                      defaultValue={searchOption.priceMax === -1 ? 0 : searchOption.priceMax}
                      onChange={(e) => {
                        setSearchOption({
                          ...searchOption,
                          priceMax: parseInt(e.target.value)
                        });
                      }}
                    />
                  </FormGroup>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label 
                htmlFor="bedrooms"
                sm={2}
              >
                Bedrooms
              </Label>
              <Col 
                className="d-flex algin-items-center" 
                sm={10}
              >
                <Input
                  id="bedrooms"
                  name="range"
                  type="range"
                  min="0" 
                  max="5" 
                  step="1"
                  className="primary"
                  defaultValue={searchOption.beds}
                  onChange={(e) => {
                    setSearchOption({
                      ...searchOption,
                      beds: parseInt(e.target.value)
                    });
                  }}
                />
                <div className="nv-boxshadow input-range-value">
                  {searchOption.beds}
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label 
                htmlFor="bathrooms"
                sm={2}
              >
                Bathrooms
              </Label>
              <Col 
                className="d-flex algin-items-center" 
                sm={10}
              >
                <Input
                  id="bathrooms"
                  name="range"
                  type="range"
                  min="0" 
                  max="5" 
                  step="1"
                  defaultValue={searchOption.baths}
                  onChange={(e) => {
                    setSearchOption({
                      ...searchOption,
                      baths: parseInt(e.target.value)
                    });
                  }}
                />
                <div className="nv-boxshadow input-range-value">
                  {searchOption.baths}
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                htmlFor="home-type"
                sm={2}
              >
                Home Type
              </Label>
              <Col sm={10}>
                <ButtonGroup>
                  {
                    homeTypeList.map((o, idx) => {
                      return <Button
                              key={"homeTypeList" + idx}
                              color={searchOption.homeType === o.value ? 'primary' : 'secondary'}
                              onClick={() => {
                                setSearchOption({
                                  ...searchOption,
                                  homeType: o.value
                                });
                              }}
                            >
                              {o.label}
                            </Button>
                    })
                  }
                </ButtonGroup>
              </Col>
            </FormGroup>
            <FormGroup 
              row
              className="d-flex align-items-center justify-content-center mt-5"
            >
              <Button
                color="primary"
                onClick={(event) => doRentalSearchListing(event)}
              >
                Search
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Widget>
      <Widget className="widget-p-lg mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="headline-2 text-muted">Results</div>
          <Button
            color="primary"
            onClick={() => {
            }}
          >
            Add Multiples
          </Button>
        </div>
        <Row className="mt-4">
          <Col>
            <div 
              className={`text-center ${sTable.scrapedBg}`}
              style={{fontSize: '12px'}}
            >
              Zillor/Realtor Data
            </div>
          </Col>
          <Col>
            <div 
              className={`text-center ${sTable.airDNABg}`}
              style={{fontSize: '12px'}}
            >
              AirDNA Data
            </div>
          </Col>
          <Col>
            <div 
              className={`text-center ${sTable.manualBg}`}
              style={{fontSize: '12px'}}
            >
              Manual Data
            </div>
          </Col>
          <Col>
            <div 
              className={`text-center ${sTable.autoBg}`}
              style={{fontSize: '12px'}}
            >
              Automatic Calculates
            </div>
          </Col>
        </Row>
        <div className="widget-table-overflow mt-4">
          <div 
            className="table-responsive"
            style={{
              height: '350px'
            }}
          >
            <Table 
              className={`table-striped table-borderless table-hover ${sTable.statesTable}`}
              style={{
                width: '6800px'
              }}
            >
              <thead>
              <tr>
                <th 
                  width="50px"
                  className={sTable.checkboxCol + ' ' + sTable.stickyFixed}
                  style={{
                    left: '0px', 
                    zIndex: '4',
                    width: '50px'
                  }}
                >
                  <div className="checkbox checkbox-primary">
                    <input
                      className="styled"
                      id="checkbox100"
                      type="checkbox"
                    />
                    <label htmlFor="checkbox100"/>
                  </div>
                </th>
                <th 
                  width="300px" 
                  className={sTable.stickyFixed}
                  style={{left: '50px', zIndex: '4'}}
                >
                  ADDRESS
                </th>
                <th width="100px">STATE</th>
                <th width="100px">ZIP</th>
                <th width="150px">PRICE</th>
                <th width="150px">NAME</th>
                <th width="150px">CONTACT</th>
                <th width="150px">AirDNA ADR</th>
                <th width="100px">AirDNA OCCUPANCY %</th>
                <th width="100px">BEDS</th>
                <th width="100px">BATHS</th>
                <th width="150px">SQUARE</th>
                <th width="150px">Finished Basement</th>
                <th width="150px"># of Garages</th>
                <th width="150px">Pool/Hot tub</th>
                <th width="150px">Central Air</th>
                <th width="150px">Appl Required</th>
                <th width="150px">Financing</th>
                <th width="150px">Estimate Airbnb Rehab</th>
                <th width="150px">First & Security</th>
                <th width="150px">Furniture Cost</th>
                <th width="150px">Appliance Cost</th>
                <th width="150px">Additional Costs</th>
                <th width="150px">Monthly Airdna Income</th>
                <th width="150px">Airbnb Fee</th>
                <th width="150px">Maintenance</th>
                <th width="150px">Internet & Utilities</th>
                <th width="150px">Landscape</th>
                <th width="150px">Insurance</th>
                <th width="150px">Property Management</th>
                <th width="150px">Landlord Rent</th>
                <th width="150px">Rental Tax</th>
                <th width="150px">Supplies</th>
                <th width="150px">Pool Maint</th>
                <th width="150px">Interest</th>
                <th width="150px">All In Expenses</th>
                <th width="150px">Monthly Cashflow</th>
                <th width="150px">Yearly Cashflow</th>
                <th width="150px">Cash on Cash Return</th>
                {/* <th width="150px">AirDNA Comp #1</th>
                <th width="150px">AirDNA Comp #2</th>
                <th width="150px">AirDNA Comp #3</th>
                <th width="150px">AirDNA Comp #4</th>
                <th width="150px">AirDNA Comp #5</th> */}
                <th width="250px">Image Links</th>
                <th width="150px">ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              {
                props.listing
                .map((item, idx) => (
                  <tr key={uuidv4()}>
                    <td 
                      className={sTable.stickyFixed}
                      style={{left: '0px'}}
                    >
                      <div className="checkbox checkbox-primary">
                        <input
                          id={idx}
                          className="styled"
                          type="checkbox"
                        />
                        <Label htmlFor={idx} />
                      </div>
                    </td>
                    <td 
                      className={sTable.stickyFixed + ' ' + sTable.scrapedBg}
                      style={{left: '50px'}}
                    >
                      <a 
                        href={item.link}
                        target="_blank"
                        style={{color: "white"}}
                      >
                        {item.address}
                      </a>
                    </td>
                    <td className={sTable.scrapedBg}>{item.state}</td>
                    <td className={sTable.scrapedBg}>{item.zipcode}</td>
                    <td className={sTable.scrapedBg}>{item.landlord_rent}</td>
                    <td className={sTable.scrapedBg}>{item.landlord_name}</td>
                    <td className={sTable.scrapedBg}>{item.landlord_contact}</td>
                    <td className={sTable.airDNABg}>{item.airdna_adr}</td>
                    <td className={sTable.airDNABg}>{item.airdna_occupancy}</td>
                    <td className={sTable.scrapedBg}>{item.beds}</td>
                    <td className={sTable.scrapedBg}>{item.baths}</td>
                    <td className={sTable.scrapedBg}>{item.square_footage}</td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="finished_basement"
                        name="finished_basement"
                        value={item.finished_basement}
                        type="select"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "finished_basement",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                        {
                          finishedBasementVals.map((o, idx) => {
                            return <option 
                                      key={uuidv4()}
                                      index={'fb' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input> 
                    </td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="garages"
                        name="garages"
                        value={item.garages}
                        type="select"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "garages",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                        {
                          garagesVals.map((o, idx) => {
                            return <option
                                      key={uuidv4()}
                                      index={'gar' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input>
                    </td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="pool_hot_tub"
                        name="pool_hot_tub"
                        value={item.pool_hot_tub}
                        type="select"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "pool_hot_tub",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                        {
                          poolhotTubVals.map((o, idx) => {
                            return <option
                                      key={uuidv4()}
                                      index={'pol' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input>
                    </td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="central_air"
                        name="central_air"
                        value={item.central_air}
                        type="select"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "central_air",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                        {
                          centralAirVals.map((o, idx) => {
                            return <option
                                      key={uuidv4()}
                                      index={'cent' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input>
                    </td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="appl_required"
                        name="appl_required"
                        value={item.appl_required}
                        type="select"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "appl_required",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                        {
                          applRequiredVals.map((o, idx) => {
                            return <option
                                      key={uuidv4()}
                                      index={'appl' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input>
                    </td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="financing"
                        name="financing"
                        value={item.financing}
                        type="select"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "financing",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                        {
                          financingVals.map((o, idx) => {
                            return <option
                                      key={uuidv4()}
                                      index={'fin' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input>
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.estimate_airbnb_rehab)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.first_security)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.furniture_cost)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.appliance_cost)}
                    </td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="additional_costs"
                        name="additional_costs"
                        value={item.additional_costs}
                        type="number"
                        onChange={(e) => {
                          rentalUpdateListingWithExtras(
                            "manual-auto", 
                            {
                              link: item.link,
                              field: "additional_costs",
                              value: e.target.value
                            }
                          );
                        }}
                      >
                      </Input>
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.monthly_airdna_income)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.airbnb_fee)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.maintenance)}
                    </td>
                    <td className={sTable.autoBg}>
                      {props.settings.internetUtility}
                    </td>
                    <td className={sTable.autoBg}>
                      {props.settings.landscapeLawnSnow}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.insurance)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.property_management)}
                    </td>
                    <td className={sTable.autoBg}>
                      {item.landlord_rent}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.rental_tax)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.supplies)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.pool_maint)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.interest)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.all_in_expenses)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.monthly_cashflow)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.yearly_cashflow)}
                    </td>
                    <td className={sTable.autoBg}>
                      {fixedNumber(item.cash_on_cash_return)}
                    </td>
                    {/* <td className={sTable.airDNABg}></td>
                    <td className={sTable.airDNABg}></td>
                    <td className={sTable.airDNABg}></td>
                    <td className={sTable.airDNABg}></td>
                    <td className={sTable.airDNABg}></td> */}
                    <td className={sTable.scrapedBg}>{item.imgs}</td>
                    <td>
                      <Badge
                        color="success"
                        className={sTable.shortlist}>
                          Add To Shortlist
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              
            </div>
            <Pagination 
              className="pagination-borderless" 
              aria-label="Page navigation"
            >
              <PaginationItem 
                disabled={currentPage <= 0}
                className={sTable.currentPageCtrl} 
              >
                <PaginationLink
                  className="ml-0 px-1 text-center"
                  onClick={e => updateCurrentPage(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>
              <Input
                name="current"
                type="number"
                className={sTable.currentPage}
                defaultValue={currentPage}
              >
              </Input>
              <PaginationItem
                className={sTable.currentPageCtrl} 
                disabled={currentPage >= props.numberOfPages - 1}
              >
                <PaginationLink
                  className="ml-0 px-1 text-center"
                  onClick={e => updateCurrentPage(e, currentPage + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </Widget>
    </div>
  );
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.rentals.isFetching,
    errorMessage: state.auth.errorMessage,
    listing: state.rentals.listing,
    numberOfPages: state.rentals.numberOfPages,
    settings: state.rentals.settings
  };
}

export default withRouter(connect(mapStateToProps)(Search));
