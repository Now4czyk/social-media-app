import { ChangeEvent } from "react";
import {
  Box,
  MenuItem,
  Pagination as PaginationMUI,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Params } from "../../pages";

const createChangeEvent = (perPage: number, page: number) =>
  ({
    type: "Pagination change event",
    target: { perPage, page },
  } as any);

export interface PaginationProps {
  params: Params;
  total: number;
  onChange?: (event: ChangeEvent<{ perPage: number; page: number }>) => void;
}

export const Pagination = ({ total, onChange, params }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    onChange?.(createChangeEvent(params.perPage, value));
    setSearchParams({
      perPage: params.perPage.toString(),
      page: value.toString(),
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    onChange?.(createChangeEvent(parseInt(e.target.value), params.page));
    setSearchParams({
      perPage: e.target.value,
      page: params.page.toString(),
    });
  };

  return (
    <Box>
      <Select
        value={searchParams.get("perPage") || undefined}
        type="number"
        label="Age"
        onChange={handleSelectChange}
        sx={{ minWidth: "5rem" }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
      </Select>
      <PaginationMUI
        page={+(searchParams.get("page") || params.page)}
        count={Math.ceil(total / params.perPage)}
        onChange={handlePaginationChange}
      />
    </Box>
  );
};
