import { Box, Input } from "native-base";

const InputTitle = (props) => {
    return (
      <Box alignItems="center">
        <Input fontWeight={600} size="xl" bg="white" variant="unstyled" mx="3" value={props.Title} placeholder="제목을 입력해주세요" w="100%" onChangeText={(title) => { props.setTitle(title); }} />
      </Box>
    );
  };
  export default InputTitle;