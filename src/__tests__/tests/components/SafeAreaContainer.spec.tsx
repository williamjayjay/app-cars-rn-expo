import React from 'react';
import { render } from '@testing-library/react-native';
import { View,Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaContainer } from '@/presentation/ui/components/SafeAreaContainer';


jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('<SafeAreaContainer />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children correctly', () => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 20,
      left: 0,
      right: 0,
    });

    const { getByText } = render(
      <SafeAreaContainer testID="safeAreaView">
        <Text>Test Content</Text>
      </SafeAreaContainer>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  test('applies default padding values', () => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 20,
      left: 0,
      right: 0,
    });

    const { getByTestId } = render(
      <SafeAreaContainer testID="safeAreaView">
        <View />
      </SafeAreaContainer>
    );

    const container = getByTestId('safeAreaView');
    expect(container.props.style).toContainEqual({
      flex: 1,
      paddingTop: 10,
      paddingBottom: 36, // bottom inset + 16
      paddingHorizontal: 16,
      height: '100%',
    });
  });

  test('applies justDefaultPaddingBottom correctly', () => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 20,
      left: 0,
      right: 0,
    });

    const { getByTestId } = render(
      <SafeAreaContainer justDefaultPaddingBottom testID="safeAreaView">
        <View />
      </SafeAreaContainer>
    );

    const container = getByTestId('safeAreaView');
    expect(container.props.style).toContainEqual({
      flex: 1,
      paddingTop: 10,
      paddingBottom: 20, // only bottom inset
      paddingHorizontal: 16,
      height: '100%',
    });
  });

  test('applies custom styles via classNameCustom', () => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 20,
      left: 0,
      right: 0,
    });

    const customStyle = { backgroundColor: 'red' };

    const { getByTestId } = render(
      <SafeAreaContainer classNameCustom={customStyle} testID="safeAreaView">
        <View />
      </SafeAreaContainer>
    );

    const container = getByTestId('safeAreaView');
    expect(container.props.style).toContainEqual(customStyle);
  });
});
