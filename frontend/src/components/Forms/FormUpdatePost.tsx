import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "graphql/Post";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { FormInputText } from "./utils";
import { Dispatch, SetStateAction } from "react";
import useTranslation from "../../translations/hooks/useTranslations";
import { MD } from "../../utils";

interface FormInputs {
  title: string;
  description: string;
  imageUrl: string;
}

export const FormUpdatePost = ({
  defaultValues,
  setEditMode,
}: {
  defaultValues: FormInputs;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const matches = useMediaQuery(MD);
  const methods = useForm<FormInputs>({ defaultValues });
  const params = useParams();
  const { handleSubmit, control, setError, formState, reset } = methods;

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      navigate(0);
      setEditMode(false);
    },
  });

  const onSubmit = async ({ title, description, imageUrl }: FormInputs) => {
    if (title.length <= 1)
      setError("title", {
        message: t("errors.title"),
      });

    if (formState.isSubmitSuccessful) {
      await updatePost({
        variables: {
          postId: params.postId,
          title,
          description,
          imageUrl,
        },
      });
    }
  };

  return (
    <Stack
      sx={{
        rowGap: "1rem",
        paddingTop: "1rem",
        width: matches ? "25rem" : "20rem",
        margin: "0 auto",
      }}
    >
      <FormInputText name="title" control={control} label={t("post.title")} />
      <FormInputText
        name="description"
        control={control}
        label={t("post.description")}
        multiline={true}
      />
      <FormInputText
        name="imageUrl"
        control={control}
        label={t("post.imageUrl")}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        {t("actions.edit")}
      </Button>
      <Button variant="contained" onClick={() => setEditMode(false)}>
        {t("actions.cancel")}
      </Button>
    </Stack>
  );
};
