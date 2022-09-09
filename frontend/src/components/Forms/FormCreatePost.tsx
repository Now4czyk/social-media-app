import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./utils";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "graphql/Post";
import useTranslation from "../../translations/hooks/useTranslations";
import { MD } from "../../utils";

interface FormInputs {
  title: string;
  description: string;
  imageUrl: string;
}

const defaultValues: FormInputs = {
  title: "",
  description: "",
  imageUrl: "",
};

export const FormCreatePost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const methods = useForm<FormInputs>({ defaultValues });
  const { handleSubmit, control, setError, formState, reset } = methods;
  const matches = useMediaQuery(MD);

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      navigate(0);
      reset();
    },
  });

  const onSubmit = async ({ title, description, imageUrl }: FormInputs) => {
    if (title.length <= 1)
      setError("title", {
        message: t("errors.title"),
      });

    if (formState.isSubmitSuccessful) {
      await createPost({
        variables: {
          title,
          description,
          imageUrl,
        },
      });
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Typography align="center" marginY="1rem" sx={{ fontSize: "1.5rem" }}>
          {t("actions.createPost")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
            width: matches ? "25rem" : "20rem",
          }}
        >
          <FormInputText
            name="title"
            control={control}
            label={t("post.title")}
          />
          <FormInputText
            name="description"
            control={control}
            label={t("post.description")}
          />
          <FormInputText
            name="imageUrl"
            control={control}
            label={t("post.imageUrl")}
          />
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {t("actions.create")}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
