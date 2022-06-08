function openNav() {
    console.log("abc");
    document.getElementById("mySidenav").style.width = "230px";
    document.getElementById("other").style.marginLeft = "230px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
      console.log("abc");
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("other").style.marginLeft = "0px";
  }
  var isOpen = false;
  function toggleNav(){
    if(isOpen){
        closeNav();
        isOpen=false;
    }else{
        openNav();
        isOpen=true;
    }
  }

