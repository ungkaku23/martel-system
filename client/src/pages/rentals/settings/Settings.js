import React, { useState } from "react";
import classnames from "classnames";
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

const Settings = () => {
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
                />
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                <Input
                  id="avg-supply-budget"
                  name="avgSupplyBudget"
                  type="text"
                />&nbsp;per Night
              </Col>
            </FormGroup>
            <FormGroup 
              row
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                color="primary"
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

export default Settings;
