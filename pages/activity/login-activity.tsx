import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Layout from '@common/Layout';
import { Box, Button, Stack } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Custom_Filter from '@common/utils/filter/filter_utils';
import Breadcrumb from '@common/Breadcrumb';

const LoginActivity = () => {
	return <React.Fragment></React.Fragment>;
};

LoginActivity.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default LoginActivity;
