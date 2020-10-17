import React, { FunctionComponent, useContext } from "react";
import { useForm } from "antd/lib/form/Form";
import { Card, Form, Row, Col, Input, Button, Layout, Breadcrumb } from "antd";

import { CompanyContext } from "../../contexts/CompanyContext";

import StyledTitle from "../../components/StyledTitle";
import ContentCard from "../../components/ContentCard";
import Notification from '../../helpers/notification'
import api from '../../config/api'

import "./styles.scss";

const CompanyCategoryPage: FunctionComponent = () => {

  return (
    <>
      <StyledTitle level={2}>Categorias de Empresa</StyledTitle>

      <ContentCard>
        Bill is a cat
      </ContentCard>
    </>
  );
};

export default CompanyCategoryPage;
