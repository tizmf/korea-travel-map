const sigunguList = [
  "서울특별시 강남구", "서울특별시 종로구", "제주특별자치도 제주시", "부산광역시 해운대구"
];

const form = document.getElementById("travel-form");

sigunguList.forEach(sigungu => {
  const label = document.createElement("label");
  label.innerHTML = `
    <input type="checkbox" name="sigungu" value="${sigungu}" />
    ${sigungu}
    <input type="text" name="link-${sigungu}" placeholder="여행일기 링크 입력" />
  `;
  form.appendChild(label);
});

function saveData() {
  const checked = [...document.querySelectorAll("input[type='checkbox']:checked")];
  const data = {};
  checked.forEach(cb => {
    const linkInput = document.querySelector(`input[name='link-${cb.value}']`);
    data[cb.value] = linkInput.value;
  });
  localStorage.setItem("travelData", JSON.stringify(data));
  alert("저장되었습니다!");
}
