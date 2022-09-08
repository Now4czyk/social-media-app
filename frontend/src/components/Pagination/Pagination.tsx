import { ChangeEvent, useState } from "react";
import {
  Box,
  MenuItem,
  Pagination as PaginationMUI,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

const createChangeEvent = (perPage: number, page: number) =>
  ({
    type: "Pagination change event",
    target: { perPage, page },
  } as any);

export interface PaginationProps {
  perPage: number;
  total: number;
  onChange?: (event: ChangeEvent<{ perPage: number; page: number }>) => void;
}

type Count = 1 | 5;

export const Pagination = ({ total, onChange }: PaginationProps) => {
  const [perPage, setPerPage] = useState<Count>(5);
  const [page, setPage] = useState<Count>(1);
  const navigate = useNavigate();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    onChange?.(createChangeEvent(perPage, value));
    setPage(value as Count);
    navigate({
      search: createSearchParams({
        perPage: "2137",
        page: "2",
      }).toString(),
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    onChange?.(createChangeEvent(parseInt(e.target.value), page));
    setPerPage(parseInt(e.target.value) as Count);
  };

  return (
    <Box>
      <Select
        value={perPage.toString()}
        type="number"
        label="Age"
        onChange={handleSelectChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
      <PaginationMUI
        count={total / perPage}
        onChange={handlePaginationChange}
      />
    </Box>
  );
};
