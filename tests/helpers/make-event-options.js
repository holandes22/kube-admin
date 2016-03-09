export default function makeEventOptions(content='fake_content', type='application/json') {
  let fileName = 'fake_name',
      blob = new window.Blob([content], { type }),
      file = new window.File([blob], fileName);
  return { target: { files: [file] } };
}
