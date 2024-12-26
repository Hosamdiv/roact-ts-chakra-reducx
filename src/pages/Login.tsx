import { Flex, Box, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { Checkbox } from "../components/ui/checkbox";
import { useColorModeValue } from "../components/ui/color-mode";
import { PasswordInput } from "../components/ui/password-input";
import { useEffect, useState } from "react";
import { Field } from "../components/ui/field";
import { selectLogin, userLogin } from "../App/features/loginStore";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../App/store";

interface RootLayoutProps {
  isAuthenticated: boolean;
}

export interface IUser {
  identifier: string;
  password: string;
}

const SimpleCard = ({ isAuthenticated }: RootLayoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useSelector(selectLogin);

  const [user, setUser] = useState<IUser>({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }

    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "blun.900")}
    >
      <Stack mx="auto" maxW="lg" py={12} px={1}>
        <Stack align="center">
          <Heading fontSize="4xl" my="30px">
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          as="form"
          rounded="lg"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow="lg"
          p={8}
          onSubmit={submitHandler}
        >
          <Stack>
            <div id="email" className="space-y-1 py-2">
              <Field
                invalid={isEmail}
                label="Email address"
                errorText="Email field is required"
              >
                <Input
                  name="identifier"
                  id="email"
                  type="email"
                  value={user.identifier}
                  onChange={changeHandler}
                  className="border px-2"
                />
              </Field>
            </div>

            <div id="password" className="space-y-1 py-2">
              <Field
                invalid={isPassword}
                label="Password"
                errorText="Password field is required"
              >
                <PasswordInput
                  name="password"
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={changeHandler}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px blue.400",
                  }}
                  className="border px-2"
                />
              </Field>
            </div>

            <Stack>
              <Stack
                my="10px"
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox>Remember me</Checkbox>
                <Text color="blue.400">Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                loading={loading}
                bg="blue.400"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>

              <Toaster />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SimpleCard;
