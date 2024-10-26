import logo from '../assets/images/logo.png';
import { Avatar } from 'primereact/avatar';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [username, setUsername] = useState('');
  const menuLeft = useRef<Menu>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const items: MenuItem[] = [
      {
          label: username,
          icon: 'pi pi-user',
          items: [
              {
                  label: 'Add Book',
                  icon: 'pi pi-plus',
                  url: '/add_book'
              },
              {
                  label: 'My Books',
                  icon: 'pi pi-book',
                  command: (event) => {
                    navigate('/list_book', {
                      state: {
                        user_id: "",
                        heading: "My Books",
                        loggedUser: true,
                      }
                    });
                  }
              },
              {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command(event) {
                  handleLogout();
                },
            }
          ]
      }
  ];  

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout(); 
  };

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username);
  },[])

  const start = (
    <div className="text-xl font-bold cursor-pointer flex flex-row pl-2">
      <img src={logo} alt="Logo" className="login-image" style={{ height: "2rem" }}/>
      <div className="text-xl font-bold cursor-pointer pl-2">
        BookTrade
      </div>
    </div>
  );

  const end = (
    <div className="flex items-center gap-4">
      <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
      <Avatar
        label={username[0]}
        shape="circle"
        className="cursor-pointer"
        onClick={
          (event) =>{
            menuLeft.current?.toggle(event);
          }
        }
      />
    </div>
  );

  return (
    <div className="shadow-lg">
      <Menubar start={start} end={end} className="relative w-full"/>
    </div>
  );
};