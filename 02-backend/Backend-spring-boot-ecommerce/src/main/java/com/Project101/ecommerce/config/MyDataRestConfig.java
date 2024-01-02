package com.Project101.ecommerce.config;

import com.Project101.ecommerce.entity.Product;
import com.Project101.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.Set;



@Configuration
public class MyDataRestConfig<List> implements RepositoryRestConfigurer, MyDataRestConfi {

    private final EntityManager entityManager;

    @Autowired
    public  MyDataRestConfig(EntityManager theentityManager) {
        entityManager = theentityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Disable HTTP methods for Product: PUT, POST, and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // Disable HTTP methods for ProductCategory: PUT, POST, and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));



        // call
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {



        // expose entity ids

        //



        // - get a list of all entity classes from the entity manager

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();



        // - create an array of the entity types

        List<Class> entityClasses = new ArrayList<>();



        // - get the entity types for the entities

        for (EntityType tempEntityType : entities) {

            entityClasses.add(tempEntityType.getJavaType());

        }



        // - expose the entity ids for the array of entity/domain types

        Class[] domainTypes = entityClasses.toArray(new Class[0]);

        config.exposeIdsFor(domainTypes);

    }
}

