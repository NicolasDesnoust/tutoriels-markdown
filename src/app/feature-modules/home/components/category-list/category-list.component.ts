import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/layouts/model/category";
import { CategoryService } from "src/app/layouts/services/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>;
  
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.fetchCategories();
  }

  ngOnInit(): void {}
}
