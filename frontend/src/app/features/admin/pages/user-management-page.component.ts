import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User, UserRole } from '../../../models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
})
export class UserManagementPageComponent implements OnInit {
  users: User[] = [];
  loading = false;

  readonly roles: UserRole[] = ['admin', 'editor', 'viewer'];

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.userService.listUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateRole(user: User, role: string): void {
    this.userService.updateRole(user._id, role as UserRole).subscribe({
      next: (res) => {
        user.role = res.user.role;
        this.toastr.success('Role updated');
      },
    });
  }

  deleteUser(user: User): void {
    if (!confirm(`Delete user ${user.email}?`)) return;

    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u._id !== user._id);
        this.toastr.success('User deleted');
      },
    });
  }
}
