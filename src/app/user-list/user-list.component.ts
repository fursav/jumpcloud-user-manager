import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmUserDeleteComponent } from '../confirm-user-delete/confirm-user-delete.component';
import { SystemUser, UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  userList: SystemUser[] = [];
  columnList: TableColDef[] = [];
  visibleColumnIdList: string[] = [];
  dataSource!: MatTableDataSource<SystemUser>;
  selection!: SelectionModel<SystemUser>;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initTable();
    this.loadList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async loadList() {
    try {
      this.userList = await (await this.userService.getUserList()).results;
      this.dataSource.data = this.userList;
    }
    catch (e) {
      console.error(e);
      this.snackbar.open('User list failed to load', undefined, {
        duration: 3000
      });
    }
  }

  initTable() {

    this.columnList = [
      {
        columnDef: 'state',
        header: 'User State',
        cell: (element: SystemUser) => {
          switch (element.state) {
            case 'ACTIVATED':
              return 'Active';
            default:
              return element.state as string;
          }
        },
        selected: true,
        selectable: false
      },
      {
        columnDef: 'name',
        header: 'Name',
        cell: (element: SystemUser) => `${element.firstname} ${element.lastname}`,
        selected: true,
        selectable: false
      },
      {
        columnDef: 'email',
        header: 'Email',
        cell: (element: SystemUser) => `${element.email}`,
        selected: true,
        selectable: true
      },
      {
        columnDef: 'activated',
        header: 'Activated',
        cell: (element: SystemUser) => `${element.activated}`,
        selected: true,
        selectable: true
      },
      {
        columnDef: 'type',
        header: 'Employee Type',
        cell: (element: SystemUser) => `${element.employeeType}`,
        selected: false,
        selectable: true
      },
      {
        columnDef: 'jobtitle',
        header: 'Job Title',
        cell: (element: SystemUser) => `${element.jobTitle}`,
        selected: false,
        selectable: true
      },
      {
        columnDef: 'location',
        header: 'Location',
        cell: (element: SystemUser) => `${element.location}`,
        selected: false,
        selectable: true
      }
    ];
    this.dataSource = new MatTableDataSource(this.userList);
    this.cacheSelections();
    this.selection = new SelectionModel<SystemUser>(true, []);
  }

  toggleCol(col: TableColDef, state: boolean) {
    col.selected = state;
    this.cacheSelections();
  }

  cacheSelections() {
    this.visibleColumnIdList = this.columnList.filter(c => c.selected).map(c => c.columnDef);
    this.visibleColumnIdList.unshift('select');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.userList.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.userList);
  }

  applyFilter(term: string) {
    this.dataSource.filter = term.trim().toLowerCase();
  }

  addUser() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  deleteUsers() {
    const dialogRef = this.dialog.open(ConfirmUserDeleteComponent,
      {
        data: {
          count: this.selection.selected.length
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Promise.all(this.selection.selected.map((u) => this.userService.deleteUser(u.id as string)))
          .catch((e) => {
            console.error(e);
            this.snackbar.open('Error while deleting users', undefined, {
              duration: 3000
            });
          })
          .finally(() => {
            this.selection.clear();
            this.loadList();
          });
      }
    });
  }

  viewUser(user: SystemUser) {
    this.router.navigate([user.id], { relativeTo: this.route });
  }
}

interface TableColDef {
  columnDef: string;
  header: string;
  cell: (element: SystemUser) => string;
  selected: boolean;
  selectable: boolean;
}
