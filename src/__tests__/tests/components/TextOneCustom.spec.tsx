import React from 'react';
import { render } from '@testing-library/react-native';
import { TextOneCustom } from '@/presentation/ui/components/TextOneCustom';
describe('<TextOneCustom />', () => {
  test('renders the children text correctly', () => {
    const { getByText } = render(<TextOneCustom>Test Text</TextOneCustom>);

    expect(getByText('Test Text')).toBeTruthy();
  });

  test('applies the customNumberOfLines prop', () => {
    const { getByText } = render(
      <TextOneCustom customNumberOfLines={2}>Test Text</TextOneCustom>
    );

    const textElement = getByText('Test Text');
    expect(textElement.props.numberOfLines).toBe(2);
  });

  test('applies custom styles correctly', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(
      <TextOneCustom style={customStyle}>Styled Text</TextOneCustom>
    );

    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toContainEqual(customStyle);
  });

  test('uses the default lineHeight style', () => {
    const { getByText } = render(<TextOneCustom>Default Style</TextOneCustom>);

    const textElement = getByText('Default Style');
    expect(textElement.props.style).toContainEqual({ lineHeight: 35 });
  });
});
