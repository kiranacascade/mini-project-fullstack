import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverCloseButton, PopoverFooter, Text } from "@chakra-ui/react";
import { BsPersonCircle } from "react-icons/bs";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const { username } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<BsPersonCircle />} variant={"outline"} colorScheme={"green"}>
          {username}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent maxW="max-content">
          <PopoverArrow />
          <PopoverHeader as="b">Hi, {username}!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <div className="portal-button">
              <Button size="sm" backgroundColor={"white"} colorScheme="gray">
                <Text>Pembelian</Text>
              </Button>
              <Button size="sm" backgroundColor={"white"} colorScheme="gray">
                Wishlist
              </Button>
              <Button size="sm" backgroundColor={"white"} colorScheme="gray">
                Pengaturan
              </Button>
            </div>
          </PopoverBody>
          <PopoverFooter>
            <Button onClick={onSignOut} width={"125px"} colorScheme="gray">
              Log Out
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

// export default Account;
