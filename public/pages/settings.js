const menusItemsDropDown = document.querySelectorAll('.menu-item-dropdown');
const menusItemsStatic = document.querySelectorAll('.menu-item-static');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const searchBtn = document.getElementById('search-btn');
const sidebarBtn = document.getElementById('sidebar-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const logoutBtn = document.getElementById('logout-btn');
const menuItem = document.getElementById('menu-item');
const menuLink = document.querySelectorAll('.menu-link');

logoutBtn.addEventListener("click",()=>{
  window.location = "../index.html";
});

darkModeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
});

sidebarBtn.addEventListener('click',()=>{
  document.body.classList.toggle('sidebar-hidden');
});

menuBtn.addEventListener('click',()=>{
  sidebar.classList.toggle('minimize')
});

searchBtn.addEventListener('click',()=>{
  sidebar.classList.remove('minimize')
});

menusItemsDropDown.forEach((menuItem)=>{
  menuItem.addEventListener('click',()=>{
    const subMenu = menuItem.querySelector('.sub-menu');
    const isActive = menuItem.classList.toggle('sub-menu-toggle');
    if(subMenu){
      if(isActive){
        subMenu.style.height = `${subMenu.scrollHeight + 6}px`;
        subMenu.style.padding = '0.2rem 0'; 
      }else{
        subMenu.style.height = '0';
        subMenu.style.padding = '0';
      }
    }
    menusItemsDropDown.forEach((item)=>{
      if(item !== menuItem){
        const otherSubmenu = item.querySelector('.sub-menu');
        if(otherSubmenu){
          item.classList.remove('sub-menu-toggle');
          otherSubmenu.style.height = '0';
          otherSubmenu.style.padding = '0';
        }
      }
    });
  });
});

menusItemsStatic.forEach((menuItem)=>{
  menuItem.addEventListener('mouseenter',()=>{
    
    if(!sidebar.classList.contains('minimize')) return;
    
    menusItemsDropDown.forEach((item)=>{
        const otherSubmenu = item.querySelector('.sub-menu');
        if(otherSubmenu){
          item.classList.remove('sub-menu-toggle');
          otherSubmenu.style.height = '0';
          otherSubmenu.style.padding = '0';
        }
      });
  });
});

menusItemsStatic.forEach((menuItem)=>{
  menuItem.addEventListener('click',()=>{
    const subMenu = menuItem.querySelector('.sub-menu');
  
    menusItemsDropDown.forEach((item)=>{
      if(item !== menuItem){
        const otherSubmenu = item.querySelector('.sub-menu');
        if(otherSubmenu){
          item.classList.remove('sub-menu-toggle');
          otherSubmenu.style.height = '0';
          otherSubmenu.style.padding = '0';
        }
      }
    });
  });
});

menuItem.addEventListener('click',()=>{ 
    menuLink.classList.toggle('active');
});

function activeLink() {
    menuItem.forEach(item =>
    item.classList.remove('active'));
    this.classList.add('active');
}

function checkWindowsSize(){
  sidebar.classList.remove('minimize');
}
checkWindowsSize();
window.addEventListener('resize',checkWindowsSize);