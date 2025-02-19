export const copyClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("URL이 복사되었습니다!");
  } catch (err) {
    console.error("URL 복사 실패:", err);
  }
};
