import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, FormErrorMessage } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const url = "http://localhost:2000/auth/register";

export const RegistrationForm = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    username: Yup.string().min(4, "Username must be 4 characters at minimum").required("Username is required"),
    email: Yup.string().email("Invalid email address format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .matches(/[a-z]/, "Password must contain at least lowercase")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(/[!@#$%&?*]/, "Password must contain at least 1 symbol"),
  });

  const signUp = async (values) => {
    try {
      const result = await axios.post(url, values);

      console.log(result.data.data);

      //memberikan alert ketika berhasil login
      alert(result.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <Formik initialValues={{ username: "", email: "", password: "", password_confirmation: "" }} validationSchema={registerSchema} onSubmit={(values) => signUp(values)}>
      {(props) => {
        // console.log(props);
        return (
          <>
            <Flex minH={"100vh"} align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Sign Up Now</Heading>
                </Stack>
                <Box rounded={"lg"} boxShadow={"lg"} p={8} maxW={"lg"} w={"450px"}>
                  <Stack spacing={4}>
                    <Form>
                      <Field name="username" validate={registerSchema}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.username && form.touched.username} mb="5">
                            <FormLabel>Username</FormLabel>
                            <Input {...field} placeholder="Insert your name here" />
                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="email" validate={registerSchema}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.email && form.touched.email} mb="5">
                            <FormLabel>Email</FormLabel>
                            <Input type={"email"} {...field} placeholder="Insert your email here" />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="password" validate={registerSchema}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.password && form.touched.password} mb="5">
                            <FormLabel>Password</FormLabel>
                            <Input type={"password"} {...field} placeholder="Type your password here" />
                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="password_confirmation" validate={registerSchema}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.password && form.touched.password} mb="5">
                            <FormLabel>Password Confirmation</FormLabel>
                            <Input type={"password"} {...field} placeholder="Type your password once again" />
                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                        <Checkbox>Remember me</Checkbox>
                        <Link onClick={() => navigate("/")} color={"green.400"}>
                          Back to home
                        </Link>
                      </Stack>

                      <Button mt={4} colorScheme="green" type="submit">
                        Daftar
                      </Button>
                    </Form>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </>
        );
      }}
    </Formik>
  );
};
