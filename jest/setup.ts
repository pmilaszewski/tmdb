'@testing-library/react-native/extend-expect'

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: '',
  AntDesign: '',
  FontAwesome: '',
}))

jest.mock('axios')
