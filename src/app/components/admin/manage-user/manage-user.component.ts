import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { Role } from '../../../models/role.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-manage-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent  implements OnInit {
  users: User[] = [];
  selectedUser= this.initializeNewUser(); // To store the user being edited
  newUser: User = this.initializeNewUser();
  roles = Object.values(Role);
  username:string | null = ""

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
   
      this.username = localStorage.getItem('email');
    
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser(): void {
    this.userService.createUser(this.newUser).subscribe((user) => {
      this.users.push({...user});
      this.resetNewUserForm();
      this.loadUsers();
      $('.modal').modal('hide')
    });
  }

  editUser(id: number): void {
    this.userService.getUserById(id).subscribe((user) => {
      this.selectedUser = user;
      $('.modal').modal('hide')
    });
  }

  updateUser(): void {
    if (this.selectedUser) {
    
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe((user) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
        this.selectedUser = this.initializeNewUser();;
        $('.modal').modal('hide')
      });
    }
  }

  deleteUser(id: number): void {
    if(this.selectedUser.email === this.username)
      {
        alert("Current user can't delete")
        return;
      }

    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      $('.modal').modal('hide')
      this.loadUsers();
    });
  }

  initializeNewUser(): User {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      city: '',
      email: '',
      password: '12345',
      role: Role.PLAYER // Default role
    };
  }

  resetNewUserForm(): void {
    this.newUser = this.initializeNewUser();
  }
}