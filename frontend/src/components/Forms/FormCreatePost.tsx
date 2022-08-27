import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./utils/FormInputText";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "graphql/Mutations";

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
  const methods = useForm<FormInputs>({ defaultValues });
  const { handleSubmit, control, setError, formState, reset } = methods;

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      navigate("/posts");
      reset();
    },
  });

  const onSubmit = async ({ title, description, imageUrl }: FormInputs) => {
    if (title.length <= 1)
      setError("title", {
        message: "Title should be typed",
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        paddingTop: "1rem",
        width: "25rem",
      }}
    >
      <FormInputText name="title" control={control} label="Title" />
      <FormInputText name="description" control={control} label="Description" />
      <FormInputText
        name="imageUrl"
        control={control}
        label="ImageUrl(file upload available soon)"
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Create
      </Button>
    </Box>
  );
};
