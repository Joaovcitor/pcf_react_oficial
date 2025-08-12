import axios from "../../services/axios";
import { useEffect } from "react";
export default function searchAllUsers(setAllUsers) {
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/users/");
        console.log(response.data);
        return setAllUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);
}
