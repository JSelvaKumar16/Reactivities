/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActvityDashboard from "../../features/activities/dashboard/ActvityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActvityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
