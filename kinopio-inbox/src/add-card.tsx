import { Form, ActionPanel, Action, Toast, showToast, getPreferenceValues } from "@raycast/api";
import { useState } from "react";

const cardLimit = 300

type Values = {
  name: string;
};

export default function Command(props: LaunchProps<{ draftValues: Values }>) {
  const { draftValues } = props;
  const [nameError, setNameError] = useState<string | undefined>();

  const preferences = getPreferenceValues<Preferences>();
  console.log('🙈', preferences.apiKey);

  function validateName(value: string): boolean {
    const characterLimitError = value.length > cardLimit
    if (characterLimitError) {
      setNameError(`Cards cannot be longer than ${cardLimit} characters`)
    } else {
      setNameError(undefined)     
    }
  }

  async function handleSubmit(values: Values) {
    console.log('🎑', values);
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Saving card",
    });
    try {
      // TODO await: fetch save the card w preferences.apiKey 
      toast.style = Toast.Style.Success;
      toast.title = "Saved card to your inbox";
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to save card";
      if (error instanceof Error) {
        toast.message = error.message;
      }
    }
  }

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="name" 
        title="New Card" 
        placeholder="Type text here, or paste a URL" 
        defaultValue={draftValues?.name}
        autoFocus={true} 
        enableMarkdown={true}
        onChange={validateName}
        error={nameError}
        info="Markdown is supported"
      />
    </Form>
  );
}

// handle empty
// X too long
// server err (wrong api key)