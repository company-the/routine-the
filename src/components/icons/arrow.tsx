import { IconProps } from '../../types/icon';
import Svg, { Path } from 'react-native-svg';

const ArrowIcon = (props: IconProps) => {
  return (
    <Svg width='14' height='10' viewBox='0 0 14 10' fill='none' {...props}>
      <Path
        d='M6.99877 0.814856C7.16724 0.814856 7.33017 0.846129 7.48755 0.908677C7.64492 0.972234 7.79726 1.07715 7.94455 1.22343L13.651 6.92989C13.9032 7.1821 14.0187 7.49736 13.9975 7.87567C13.9764 8.25398 13.8502 8.55865 13.6192 8.78967C13.3458 9.06306 13.0306 9.19472 12.6734 9.18463C12.3163 9.17353 12.0117 9.04188 11.7594 8.78967L6.99877 3.99873L2.20631 8.78967C1.95411 9.04188 1.65499 9.16798 1.30896 9.16798C0.961921 9.16798 0.651705 9.03179 0.378312 8.7594C0.126103 8.5072 0 8.19698 0 7.82876C0 7.46053 0.126103 7.15032 0.378312 6.89811L6.05299 1.22343C6.20028 1.07715 6.35261 0.972234 6.50999 0.908677C6.66737 0.846129 6.83029 0.814856 6.99877 0.814856Z'
        fill='white'
      />
    </Svg>
  );
};

export default ArrowIcon;
