import tw from 'twrnc';

export function cn(...inputs: (string | undefined)[]) {
  return tw`${inputs.filter(Boolean).join(' ')}`;
}
