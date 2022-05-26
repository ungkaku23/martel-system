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

import Autocomplete from "react-google-autocomplete";

import Widget from "../../../components/Widget/Widget";

import sTable from "../../../styles/Tables.module.scss";

import mock from "../mocks.js";

import { 
  rentalSearchListing,
  rentalLoadSettings
} from "../../../actions/rentals";

import NSpinner from "../../../components/NSpinner/NSpinner";

const Search = (props) => {

  const [searchOption, setSearchOption] = useState({
    site: 'Zillow',
    homeType: 'single-family-home',
    priceMin: -1,
    priceMax: -1,
    beds: 0,
    baths: 0
  });

  const [rentalExtraInfos, setRentalExtraInfos] = useState([]);

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
  
  const [rentalSearchResults] = useState(mock.rentalSearchResults);
  const [currentPage, setCurrentPage] = useState(1);

  const updateCurrentPage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  }

  const doSearchListing = (e) => {
    e.preventDefault();
    props.dispatch(rentalSearchListing({
      ...searchOption,
      cityState,
      pageIndex: currentPage
    }));
  }

  useEffect(() => {
    props.dispatch(rentalLoadSettings());

    let tRentalExtraInfos = localStorage.getItem("rentalExtraInfos");
    if (!tRentalExtraInfos) {
      tRentalExtraInfos = [];
    } else {
      tRentalExtraInfos = JSON.parse(tRentalExtraInfos);
    }

    setRentalExtraInfos(tRentalExtraInfos);
  }, []);

  const updateRentalExtraInfos = (link, field, value) => {
    let tRentalExtraInfos = rentalExtraInfos;

    let isUpdated = false;

    tRentalExtraInfos = tRentalExtraInfos.map(o => {
      if (o.link === link) {
        isUpdated = true;
        return {
          ...o,
          [field]: value
        };
      }

      return o;
    });

    if (!isUpdated) {
      tRentalExtraInfos.push({
        "link": link,
        [field]: value
      });
    }

    setRentalExtraInfos(tRentalExtraInfos);
    localStorage.setItem("rentalExtraInfos", JSON.stringify(tRentalExtraInfos));
  }

  const loadRentalExtraInfo = (link, field) => {
    let tRentalExtraInfos = rentalExtraInfos;

    let tRentalExtraInfo = tRentalExtraInfos.find(o => o.link === link);
    if (tRentalExtraInfo && tRentalExtraInfo.hasOwnProperty(field)) {
      if (field === "additionalCosts") {
        return parseInt(tRentalExtraInfo[field]);
      }

      return tRentalExtraInfo[field];
    }

    switch (field) {
      case "finished_basement":
        return finishedBasementVals[0];
        break;
      case "garages":
        return garagesVals[0];
        break;
      case "poolhotTub":
        return poolhotTubVals[0];
        break;
      case "centralAir":
        return centralAirVals[0];
        break;
      case "applRequired":
        return applRequiredVals[0];
        break;
      case "financing":
        return financingVals[0];
        break;
      case "additionalCosts":
        return 0;
        break;
    
      default:
        break;
    }
  }

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
                              key={idx}
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
                              key={idx}
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
                onClick={(event) => doSearchListing(event)}
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
                rentalSearchResults
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
                        id="finishedBasement"
                        name="finishedBasement"
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "finished_basement")}
                        type="select"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "finished_basement", e.target.value);
                        }}
                      >
                        {
                          finishedBasementVals.map((o, idx) => {
                            return <option 
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
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "garages")}
                        type="select"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "garages", e.target.value);
                        }}
                      >
                        {
                          garagesVals.map((o, idx) => {
                            return <option
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
                        id="poolhotTub"
                        name="poolhotTub"
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "poolhotTub")}
                        type="select"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "poolhotTub", e.target.value);
                        }}
                      >
                        {
                          poolhotTubVals.map((o, idx) => {
                            return <option
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
                        id="centralAir"
                        name="centralAir"
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "centralAir")}
                        type="select"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "centralAir", e.target.value);
                        }}
                      >
                        {
                          centralAirVals.map((o, idx) => {
                            return <option
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
                        id="applRequired"
                        name="applRequired"
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "applRequired")}
                        type="select"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "applRequired", e.target.value);
                        }}
                      >
                        {
                          applRequiredVals.map((o, idx) => {
                            return <option
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
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "financing")}
                        type="select"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "financing", e.target.value);
                        }}
                      >
                        {
                          financingVals.map((o, idx) => {
                            return <option
                                      index={'fin' + idx} 
                                      value={o}
                                    >
                                    {o}
                                  </option>
                          })
                        }
                      </Input>
                    </td>
                    <td className={sTable.autoBg}>1</td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.manualBg}>
                      <Input
                        id="additionalCosts"
                        name="additionalCosts"
                        value={loadRentalExtraInfo(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "additionalCosts")}
                        type="number"
                        onChange={(e) => {
                          updateRentalExtraInfos(item.hasOwnProperty("link") && item.link !== "" ? item.link : "nl" + idx, "additionalCosts", parseInt(e.target.value));
                        }}
                      >
                      </Input>
                    </td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
                    <td className={sTable.autoBg}></td>
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
    rentalSearchResults: state.rentals.rentalSearchResults,
    numberOfPages: state.rentals.numberOfPages,
    settings: state.rentals.settings
  };
}

export default withRouter(connect(mapStateToProps)(Search));
