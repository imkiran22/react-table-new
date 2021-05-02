import { Customers } from "./Customers";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../test-utils";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fireEvent, waitForDomChange } from "@testing-library/react";

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares);
const mockData = {
  pagination: {
    page: 2,
    per_page: 6,
    total: 12,
    total_pages: 2
  },
  data: [
    {
      id: 7,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg"
    },
    {
      id: 8,
      email: "lindsay.ferguson@reqres.in",
      first_name: "Lindsay",
      last_name: "Ferguson",
      avatar: "https://reqres.in/img/faces/8-image.jpg"
    },
    {
      id: 9,
      email: "tobias.funke@reqres.in",
      first_name: "Tobias",
      last_name: "Funke",
      avatar: "https://reqres.in/img/faces/9-image.jpg"
    },
    {
      id: 10,
      email: "byron.fields@reqres.in",
      first_name: "Byron",
      last_name: "Fields",
      avatar: "https://reqres.in/img/faces/10-image.jpg"
    },
    {
      id: 11,
      email: "george.edwards@reqres.in",
      first_name: "George",
      last_name: "Edwards",
      avatar: "https://reqres.in/img/faces/11-image.jpg"
    },
    {
      id: 12,
      email: "rachel.howell@reqres.in",
      first_name: "Rachel",
      last_name: "Howell",
      avatar: "https://reqres.in/img/faces/12-image.jpg"
    }
  ],
  support: {
    url: "https://reqres.in/#support-heading",
    text:
      "To keep ReqRes free, contributions towards server costs are appreciated!"
  }
};

const init = {
  initialState: {
    customers: { ...mockData },
    login: {}
  }
};

const store = mockStore(init);

describe("Customers", () => {
  it("Renders the Customers component", async () => {
    const component = render(<Customers />, { ...init });
    expect(
      (await component.findByTestId("customer-title")).textContent
    ).toEqual("My Customers");
  });

  it("Renders the customers data table with the list of data from Reqris server", async () => {
    const component: any = render(<Customers />, { ...init });
    const dataTable = await component.container.querySelector("div.content");
    expect(dataTable).toBeTruthy();
  });

  it("Search by filters", async () => {
    const listener = jest.fn();
    const component: any = render(<Customers />, { ...init });
    const searchInput = await component.findByTestId("search-input");
    await fireEvent.change(searchInput, { target: { value: "George" } });
    waitForDomChange().then(() => {
      expect(searchInput.textContent).toBe("George");
    });
  });
});
