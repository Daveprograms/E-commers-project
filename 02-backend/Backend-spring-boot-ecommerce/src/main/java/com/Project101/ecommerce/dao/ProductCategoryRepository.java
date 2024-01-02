package com.Project101.ecommerce.dao;

import com.Project101.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")

@RepositoryRestResource(collectionResourceRel = "productsCategory", path ="product-category")

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
