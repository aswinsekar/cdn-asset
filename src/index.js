import "./styles.css";

const inputs = document.querySelector("input");

const rowTmplt = document.createElement("tr");
rowTmplt.innerHTML =
  "<td></td><td><span class='dot></span></td><td><span class='dot></span></td><td><span class='dot></span></td><td><span class='dot></span></td><td><span class='dot></span></td>";

const createRow = (data) => {
  const tr = rowTmplt.cloneNode(true),
    td1 = tr.firstChild;
  tr.data_id = data.index;
  td1.textContent = data.value;
  return tr;
};

const generateRows = (json = {}) => {
  const tbody = document.querySelector(".indResult tbody");
  for (const property in json) {
    const row = createRow({
      index: property,
      value: json[property]
    });
    tbody.appendChild(row);
  }
};

inputs.addEventListener("change", (event) => {
  const value = event.target.value;
  if (
    value &&
    value.match(
      /((?=http|https)[\S]*:\/\/[\S]*.+)|([\S]*(?:\w{2}\.\w+\.\w+)[\S]*)/gi
    )
  ) {
    // preprocess the urls
    const assetMetaURl = `${value}/assetmeta/asset-meta.json`;
    fetch(assetMetaURl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        generateRows(data);
      });
  }
});
