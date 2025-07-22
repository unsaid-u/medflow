import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import useModal from "../hooks/useModal";
import CreateVisitModal from "../components/CreateVisitModal";
import VistsTable from "../components/VistsTable";
import { visitsAPI } from "../utils/api";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  height: 100%;
  width: 100%;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-family: Inter;
`;

const VisitsTableWrapper = styled.div`
  padding: 20px;
`;

function VisitsListing() {
  const { openModal, closeModal, Modal } = useModal();
  const [visits, setVisits] = useState([]);
  const [total, setTotal] = useState(0);

  // DataGrid pagination model (0-based page)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const fetchVisits = async () => {
    const apiPage = paginationModel.page + 1;
    const { data, error } = await visitsAPI.getAll(
      apiPage,
      paginationModel.pageSize
    );

    if (error) {
      console.error(error);
      toast.error("Error fetching visits");
    } else {
      setVisits(data.items);
      setTotal(data.page.itemTotal);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <Wrapper>
      <HeaderDiv>
        <Heading>Visits Tracker</Heading>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<EditCalendarIcon />}
          onClick={openModal}
        >
          Log visit
        </Button>
      </HeaderDiv>

      <Alert severity="info">
        You need patient ID and clinician ID for creating visit, you can
        directly create visits from{" "}
        <Link
          to="/dashboard/patients"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Patient
        </Link>{" "}
        and{" "}
        <Link
          to="/dashboard/clinicians"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Clinician
        </Link>{" "}
        directories
      </Alert>
      <VisitsTableWrapper>
        <VistsTable
          visits={visits}
          totalCount={total}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
        />
      </VisitsTableWrapper>
      <Modal>
        <CreateVisitModal
          closeModal={closeModal}
          onVisitCreated={fetchVisits}
        />
      </Modal>
    </Wrapper>
  );
}

export default VisitsListing;
