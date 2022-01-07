import tw from "tailwind-styled-components/dist/tailwind";

export default function UnsavedChanges() {
  return (
    <Container>
      <ContentContainer>
        <Text>Careful - you have unsaved changes!</Text>

        <ButtonsContainer>
          <ResetChangesButton>Reset</ResetChangesButton>
          <SaveChangesButton>Save Changes</SaveChangesButton>
        </ButtonsContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = tw.div`
  absolute bottom-0 left-0 w-[740px] h-18 p-5 pt-0
`;

const ContentContainer = tw.div`
  flex justify-between items-center p-2.5 pl-4 bg-gray-50 drop-shadow-xl
`;

const Text = tw.span`
  mr-2.5 text-gray-600 font-medium
`;

const ButtonsContainer = tw.div`
  ml-2.5
`;

const SaveChangesButton = tw.button`
  h-8 ml-2.5 px-4 py-0.5 bg-active text-sm text-white font-medium rounded-middle
`;

const ResetChangesButton = tw.button`
  w-15 h-8 ml-2.5 py-0.5 text-sm text-gray-600 font-medium
`;
