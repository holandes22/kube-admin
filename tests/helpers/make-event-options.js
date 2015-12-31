export default function makeEventOptions(content='fake_content', type='application/json') {
  let file = null;
  const fileName = 'fake_name';
  if (window.WebKitBlobBuilder) { //PhatomJS 1.9
    let builder = new window.WebKitBlobBuilder();
    builder.append([content]);
    file = builder.getBlob(type);
    file.name = fileName;
  } else {
    const blob = new window.Blob([content], { type });
    file = new window.File([blob], fileName);
  }
  return { target: { files: [file] } };
}
