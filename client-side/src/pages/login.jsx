import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, FormErrorMessage } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

//importan redux
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const url = "http://localhost:2000/auth/login";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address format").required("Email is required"),
    password: Yup.string().min(6, "Password must be 6 characters at minimum").required("Please fill in password"),
  });

  const onLogin = async (values) => {
    try {
      const result = await axios.post(url, values);

      console.log(result.data.data);

      dispatch(
        login({
          id: result.data.data.id,
          username: result.data.data.username,
          email: result.data.data.email,
          phone_number: result.data.data.phone_number,
          merchant_status: result.data.data.merchant_status,
        })
      );

      //akan menerima token saat login
      localStorage.setItem("token", result.data.token);

      //memberikan alert ketika berhasil login
      alert(result.data.message);

      //setelah menerima token akan di navigate ke home
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={(values) => onLogin(values)}>
      {(props) => {
        // console.log(props);
        return (
          <>
            <Flex minH={"100vh"} align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} w={"450px"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                </Stack>
                <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                  <Stack spacing={4}>
                    <Form>
                      <Field name="email" validate={loginSchema}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.email && form.touched.email} mb="5">
                            <FormLabel>Email</FormLabel>
                            <Input type={"email"} {...field} placeholder="Enter email address" />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="password" validate={loginSchema}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.password && form.touched.password} mb="5">
                            <FormLabel>Password</FormLabel>
                            <Input type={"password"} {...field} placeholder="Type your password here" />
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
                        Masuk
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
