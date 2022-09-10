import { ChangeEvent, ReactNode } from "react";
import {
  Box,
  MenuItem,
  Pagination as PaginationMUI,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Params } from "../../pages";
import useTranslation from "../../translations/hooks/useTranslations";

const createChangeEvent = (perPage: number, page: number) =>
  ({
    type: "Pagination change event",
    target: { perPage, page },
  } as any);

export interface PaginationProps {
  params: Params;
  total: number;
  onChange?: (event: ChangeEvent<{ perPage: number; page: number }>) => void;
  children?: ReactNode;
}

export const Pagination = ({
  total,
  onChange,
  params,
  children,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

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
      <Stack alignItems="end">
        <Select
          value={searchParams.get("perPage") || total.toString()}
          type="number"
          label="Age"
          onChange={handleSelectChange}
          sx={{ width: "5rem", height: "2.2rem", margin: "1rem 0" }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={total}>{t("messages.all")}</MenuItem>
        </Select>
      </Stack>
      {children}
      <Stack alignItems="end" sx={{ margin: "1rem 0" }}>
        <PaginationMUI
          page={+(searchParams.get("page") || params.page)}
          count={Math.ceil(total / params.perPage)}
          onChange={handlePaginationChange}
        />
      </Stack>
    </Box>
  );
};
