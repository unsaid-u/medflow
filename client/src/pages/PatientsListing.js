import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paginator from "../components/Paginator";

import ProfileCard from "../components/ProfileCard";
import { Skeleton } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  height: 100%;
  width: 100%;
`;

const Heading = styled.h1`
  font-family: Inter;
`;

const PaginatorWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex: 1;
  position: absolute;
  bottom: 30px;
  width: 100%;
  justify-content: center;
`;

const CardsListingWrapper = styled.div`
  padding: 20px;
  overflow-x: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  /* width: 100%; */
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-size: 16px;
  color: #e53935;
  grid-column: 1 / -1;
`;

const InfoMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-size: 16px;
  color: #666;
  grid-column: 1 / -1;
`;

const SkeletonCard = styled.div`
  min-width: 300px;
  max-width: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  background-color: white;
  font-family: Inter;
  height: fit-content;
  align-self: flex-start;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const SkeletonNameDOB = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonHeader>
      <Skeleton variant="circular" width={40} height={40} />
      <SkeletonNameDOB>
        <Skeleton variant="text" width="120px" height="20px" />
        <Skeleton variant="text" width="80px" height="16px" />
      </SkeletonNameDOB>
    </SkeletonHeader>
    <SkeletonBody>
      <Skeleton variant="text" width="100%" height="20px" />
      <Skeleton variant="text" width="100%" height="20px" />
      <Skeleton variant="text" width="80%" height="20px" />
    </SkeletonBody>
  </SkeletonCard>
);

//*  fixed Page size of 9

function PatientsListing() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://asia-south1.workflow.boltic.app/b4aad7f7-1a51-4d38-a260-34e387c3fd0f/patients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPatients(data.items);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const renderContent = () => {
    if (loading) {
      // Render multiple skeleton cards to match the grid layout
      return Array.from({ length: 6 }, (_, index) => (
        <ProfileCardSkeleton key={`skeleton-${index}`} />
      ));
    }

    if (error) {
      return <ErrorMessage>Error loading patients: {error}</ErrorMessage>;
    }

    if (patients.length === 0) {
      return <InfoMessage>No patients found.</InfoMessage>;
    }

    return patients.map((patient, index) => (
      <ProfileCard key={patient.id || index} user={patient} />
    ));
  };

  return (
    <Wrapper>
      <Heading>Patients</Heading>
      <CardsListingWrapper>{renderContent()}</CardsListingWrapper>
      <PaginatorWrapper>
        <Paginator />
      </PaginatorWrapper>
    </Wrapper>
  );
}

export default PatientsListing;
