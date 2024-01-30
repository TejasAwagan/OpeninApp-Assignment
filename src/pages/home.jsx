import { Fragment } from "react";

import { MobileHeader } from "../components/mobileHeader";
import { SectionLeft } from "../components/leftSection";
import { SectionRight } from "../components/rightSection";

export const Home = () => (
  <Fragment>
    <MobileHeader />

    <SectionLeft />

    <SectionRight />
  </Fragment>
);
