import React, { useState, useEffect, useSelector } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import * as Icons from "@material-ui/icons";
import "font-awesome/css/font-awesome.min.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "eva-icons/style/eva-icons.css";
import s from "./Settings.module.scss";
import {
  rentalSaveSettings,
  rentalLoadSettings 
} from "../../../actions/rentals";

const Settings = (props) => {

  const [settings, setSettings] = useState(props.settings);

  useEffect(() => {
    props.dispatch(rentalLoadSettings());
  }, []);

  useEffect(() => {
    setSettings(props.settings);
  }, [props.settings]);

  const doRentalSaveSettings = (e) => {
    e.preventDefault();
    props.dispatch(rentalSaveSettings(settings));
  }

  return (
    <div className="s-main-content">
      <Widget className="widget-p-lg">
        <div className="headline-2 text-muted">
          Rental Analysis Setting
        </div>
        <div className="mt-4">
          <Form>
            <FormGroup row>
              <Label
                for="min-monthly-profit"
                sm={4}
              >
                Desired Minimum Monthly Profits
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="min-monthly-profit"
                  name="minMonthlyProfit"
                  type="number"
                  value={settings.desiredMinMonthlyProfits}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        desiredMinMonthlyProfits: parseInt(e.target.value)
                    }));
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="airbnb-fee"
                sm={4}
              >
                Airbnb Fee
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                <Input
                  id="airbnb-fee"
                  name="airbnbFee"
                  type="number"
                  value={settings.airbnbFee}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        airbnbFee: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;%
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="property-management"
                sm={4}
              >
                Property Management 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                <Input
                  id="property-management"
                  name="propertyManagement"
                  type="number"
                  value={settings.propertyManagement}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        propertyManagement: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;%
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="avg-rental-tax"
                sm={4}
              >
                Average Rental Tax 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                <Input
                  id="avg-rental-tax"
                  name="avgRentalTax"
                  type="number"
                  value={settings.averageRentalTax}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        averageRentalTax: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;%
              </Col>
              <Col 
                sm={12}
              >
                <div className="body-3 text-muted mb-0 text-right mt-2">(Highest in Florida @ 7%)</div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="ongoing-mf"
                sm={4}
              >
                Ongoing Maintnance/Furniture 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                <Input
                  id="ongoing-mf"
                  name="ongoingMf"
                  type="number"
                  value={settings.ongoingMF}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        ongoingMF: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;%
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="internet-utilities"
                sm={4}
              >
                Internet & Utilities 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="internet-utilities"
                  name="internetUtilities"
                  type="number"
                  value={settings.internetUtility}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        internetUtility: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;/m
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="short-term-rt-insurance"
                sm={4}
              >
                Short term rental and tenant insurance 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="short-term-rt-insurance"
                  name="shortTermRTInsurance"
                  type="number"
                  value={settings.shortTermRTInsurance}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        shortTermRTInsurance: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;/yr
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="lls"
                sm={4}
              >
                Lanscape/Lawn/Snow 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="lls"
                  name="lls"
                  type="number"
                  value={settings.landscapeLawnSnow}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        landscapeLawnSnow: parseInt(e.target.value)
                    }));
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="avg-furniture-costs"
                sm={4}
              >
                Average Furniture Costs
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="avg-furniture-costs"
                  name="avgFurnitureCosts"
                  type="number"
                  value={settings.avgFurnitureCost}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        avgFurnitureCost: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;per Sq.Ft
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="avg-costs"
                sm={4}
              >
                Average Cost
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="avg-costs"
                  name="avgFCosts"
                  type="number"
                  value={settings.avgCostPerAppliance}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        avgCostPerAppliance: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;per Appliance
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="sdrm"
                sm={4}
              >
                Security Deposit Rent Multiplier
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="sdrm"
                  name="sdrm"
                  type="number"
                  value={settings.securityDepositRentMultiplier}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        securityDepositRentMultiplier: parseInt(e.target.value)
                    }));
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="avg-airdna-rehab"
                sm={4}
              >
                Average AirDna Rehab 
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="avg-airdna-rehab"
                  name="avgAirdnaRehab"
                  type="number"
                  value={settings.avgAirdnaRehab}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        avgAirdnaRehab: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;per Sq.Ft
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="avg-supply-budget"
                sm={4}
              >
                Average Supply Budget
              </Label>
              <Col 
                sm={8}
                className="d-flex align-items-center"
              >
                $&nbsp;<Input
                  id="avg-supply-budget"
                  name="avgSupplyBudget"
                  type="number"
                  value={settings.avgSupplyBudget}
                  onChange={(e) => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        avgSupplyBudget: parseInt(e.target.value)
                    }));
                  }}
                />&nbsp;per Night
              </Col>
            </FormGroup>
            <FormGroup 
              row
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                color="primary"
                onClick={(event) => doRentalSaveSettings(event)}
              >
                Save
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Widget>
    </div>
  );
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.rentals.isFetching,
    errorMessage: state.auth.errorMessage,
    settings: state.rentals.settings
  };
}

export default withRouter(connect(mapStateToProps)(Settings));
