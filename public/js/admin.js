let queryString = new URLSearchParams(window.location.search);

//로그인 uid
login_uid = JSON.parse(localStorage.getItem("user")).uid;
//news 업로더 uid
uploader_uid = db.collection("news").get().uid;

//관리자 권한
$(function () {
  db.collection("news")
    .doc(queryString.get("id"))
    .get()
    .then((result) => {
      console.log(result.data().uid);

      if (내uid == "PNO88ZWz09QX53xIvJuEqo0VYzv1") {
        document.getElementById("edit").style.display = "";
        document.getElementById("delete").style.display = "";
      }
    });
});

//관리자권한 수정
$("#edit").click(function () {
  window.location.href = "edit.html?id=" + queryString.get("id");
});

//관리자권한 삭제
$("#delete").click(function () {
  if (!confirm("삭제 하시겠습니까?")) {
    alert("취소했습니다.");
  } else {
    db.collection("news")
      .doc(queryString.get("id"))
      .delete()
      .then(() => {
        console.log("삭제 완료");
        alert("삭제가 완료되었습니다.");
      });
    let imageRef = storage.refFromURL(url);
    imageRef.delete();
    setTimeout(() => (window.location.href = "news.html"), 1500);
  }
});
