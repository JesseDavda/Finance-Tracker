import React from "react";
import { shallow } from "enzyme";
import SideMenu from "../SideMenu/SideMenu";

describe("Side Menu", () => {
	it("renders correctly", () => {
		const wrapper = shallow(<SideMenu />);
		expect(wrapper).toMatchSnapshot();
	});
});