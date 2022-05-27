import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ApexCharts from "react-apexcharts";
import {
  Row,
  Col,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge
} from "reactstrap";

import "font-awesome/css/font-awesome.min.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "eva-icons/style/eva-icons.css";
import sTable from "../../../styles/Tables.module.scss";
import s from "./Results.module.scss";

import Widget from "../../../components/Widget/Widget";

const Results = () => {

  const [filterOption, setFilterOption] = React.useState(false);
  const toggleFilterOption = () => setFilterOption(!filterOption);

  const [reportModal, setReportModal] = React.useState(false);
  const toggleReportModal = () => setReportModal(!reportModal);

  const [rentalSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const updateCurrentPage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  }
  const pageSize = 5;
  const pagesCount = Math.ceil(rentalSearchResults.length / pageSize);

  const series = [{
    name: 'Your Activity',
    type: 'column',
    data: [350, 275, 375, 375, 300, 225, 275]
  }, {
    name: 'Your Goal',
    type: 'line',
    data: [400, 350, 450, 400, 350, 300, 350]
  
  }];
  
  const chartSettings = {
    colors: ["#FFCA41", "#43BC13"],
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [0, 1]
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      style: {
        fontSize: '10px',
        fontWeight: 500,
      },
      background: {
        borderWidth: 0,
      },
    },
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    legend: {
      position: "top",
      floating: true,
    },
    xaxis: {
      type: 'category',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true,
        style: {
          colors: "#6B859E",
        },
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
      }
    },
    grid: {
      show: false,
    }
  };

  return (
    <div className="s-main-content">
      <Widget className="widget-p-lg">
        <div className="headline-2 text-muted">
          Shortlist
        </div>
        <div className="mt-4">
          <div className="row">
            <Label sm={2}>
              Search Property
            </Label>
            <Col sm={4}>
              <Input
                name="keyword"
                type="text"
              />
            </Col>
            <Col sm={2}>
              <i 
                className={`eva eva-funnel ${s.moreOptionBtn}`}
                onClick={toggleFilterOption}
              >
              </i>
            </Col>
            <Col 
              sm={4}
              className="d-flex justify-content-end align-items-center"
            >
              <Button
                color="primary"
              >
                Report Multiples
              </Button>
            </Col>
          </div>

          <div className="widget-table-overflow mt-4">
            <Table 
              className={`table-striped table-borderless table-hover ${sTable.statesTable}`} 
              responsive
            >
              <thead>
              <tr>
                <th className={sTable.checkboxCol}>
                  <div className="checkbox checkbox-primary">
                    <input
                      className="styled"
                      id="checkbox100"
                      type="checkbox"
                    />
                    <label for="checkbox100"/>
                  </div>
                </th>
                <th className="w-15">DATE</th>
                <th className="w-15">ADDRESS</th>
                <th className="w-15">STATE</th>
                <th className="w-15">CITY</th>
                <th className="w-15">ZIP</th>
                <th className="w-25">ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              {
                rentalSearchResults
                .slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
                )
                .map(item => (
                  <tr key={uuidv4()}>
                    <td>
                      <div className="checkbox checkbox-primary">
                        <input
                          id={item.id}
                          className="styled"
                          type="checkbox"
                        />
                        <Label for={item.id} />
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.zip}</td>
                    <td>
                      <Badge
                        color="warning"
                        className={sTable.shortlist}
                        onClick={toggleReportModal}
                      >
                        Report
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Label for="page-size">
                  Number of Page
                </Label>
                <Input
                  id="page-size"
                  className={sTable.pageSize}
                  name="pageSize"
                  type="select"
                >
                  <option>
                    5
                  </option>
                  <option>
                    10
                  </option>
                  <option>
                    15
                  </option>
                  <option>
                    20
                  </option>
                  <option>
                    25
                  </option>
                </Input>
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
                    value={currentPage}
                  >
                  </Input>
                  <PaginationItem
                    className={sTable.currentPageCtrl} 
                    disabled={currentPage >= pagesCount - 1}
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
        </div>
      </Widget>
      <Modal
        isOpen={filterOption}
        toggle={toggleFilterOption}
        modalTransition={{ timeout: 500 }}
      >
        <ModalHeader toggle={toggleFilterOption}>
          Filter Options
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label
                for="date"
                sm={2}
              >
                Date
              </Label>
              <Col sm={10}>
                <Input
                  id="date"
                  name="date"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="address"
                sm={2}
              >
                Address
              </Label>
              <Col sm={10}>
                <Input
                  id="address"
                  name="address"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="state"
                sm={2}
              >
                State
              </Label>
              <Col sm={10}>
                <Input
                  id="state"
                  name="state"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="city"
                sm={2}
              >
                City
              </Label>
              <Col sm={10}>
                <Input
                  id="city"
                  name="city"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="zip"
                sm={2}
              >
                Zip
              </Label>
              <Col sm={10}>
                <Input
                  id="zip"
                  name="zip"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup 
              row
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                color="primary"
                onClick={toggleFilterOption}
              >
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Modal
        size="lg"
        isOpen={reportModal}
        toggle={toggleReportModal}
        modalTransition={{ timeout: 500 }}
      >
        <ModalHeader toggle={toggleReportModal}>
          Report
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col 
              sm={6}
              className="d-flex justify-content-center"
            >
              <Button
                color="primary"
              >
                Save as Excel
              </Button>
            </Col>
            <Col 
              sm={6}
              className="d-flex justify-content-center"
            >
              <Button
                color="primary"
              >
                Save as PNG
              </Button>
            </Col>
            <Col 
              sm={12}
              className="mt-4"
            >
              <Label>
                Recent Activity
              </Label>
              <ApexCharts
                options={chartSettings}
                series={series}
                type="area"
                height={275}
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Results;
