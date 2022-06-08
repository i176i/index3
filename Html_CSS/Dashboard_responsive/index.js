function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("wrapper_full_website").style.marginLeft = "250px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("wrapper_full_website").style.marginLeft = "0px";
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


