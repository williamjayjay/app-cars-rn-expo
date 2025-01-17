import React, { useState } from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react-native";
import InteractiveTextInput from "@/presentation/ui/components/InteractiveTextInput/InteractiveTextInput";

describe("<InteractiveTextInput />", () => {
  it("renders correctly", () => {
    render(
      <InteractiveTextInput testID="input-field" placeholder="Enter text" />
    );

    const inputField = screen.getByTestId("input-field");
    expect(inputField).toBeTruthy();
  });

  it("accepts text input and updates value", async () => {
    const TestComponent = () => {
      const [text, setText] = useState("");
      return (
        <InteractiveTextInput
          testID="input-field"
          placeholder="Enter text"
          value={text}
          onChangeText={setText}
        />
      );
    };

    render(<TestComponent />);

    const inputField = screen.getByTestId("input-field");

    fireEvent.changeText(inputField, "Hello, World!");

    await waitFor(() => {
      expect(inputField.props.value).toBe("Hello, World!");
    });
  });

  it("calls onChangeText when text is entered", () => {
    const onChangeTextMock = jest.fn();

    render(
      <InteractiveTextInput
        testID="input-field"
        placeholder="Enter text"
        onChangeText={onChangeTextMock}
      />
    );

    const inputField = screen.getByTestId("input-field");

    fireEvent.changeText(inputField, "Hello");

    expect(onChangeTextMock).toHaveBeenCalledWith("Hello");
  });

  it("focuses and blurs correctly", async () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();

    render(
      <InteractiveTextInput
        testID="input-field"
        placeholder="Enter text"
        onFocus={onFocusMock}
        onBlur={onBlurMock}
      />
    );

    const inputField = screen.getByTestId("input-field");

    await act(async () => {
      fireEvent(inputField, "focus");
    });

    expect(onFocusMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent(inputField, "blur");
    });

    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it("handles secure text entry", () => {
    render(
      <InteractiveTextInput
        testID="input-field"
        secureTextEntry={true}
        placeholder="Password"
      />
    );

    const inputField = screen.getByTestId("input-field");

    expect(inputField.props.secureTextEntry).toBe(true);
  });
});
