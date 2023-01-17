import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

// interface User {
//   id: number,
//   name: string,
//   sex: string,
// }

function findCategoryById(id: number | undefined) {
  return categoriesFromServer.find((category) => category.id === id);
}

function findUserById(id: number | undefined) {
  return usersFromServer.find((user) => user.id === id);
}

export const App: React.FC = () => {
  const [activeUserFilter, setActiveUserFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsFromServer);
  const handleUserFilter = (userName: string) => {
    setActiveUserFilter(userName);
    if (userName === '') {
      setFilteredProducts(productsFromServer);

      return;
    }

    setFilteredProducts(productsFromServer.filter((product) => {
      const category = findCategoryById(product.categoryId);
      const userToMatch = findUserById(category?.ownerId);

      return (
        userToMatch?.name === userName
      );
    }));
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => handleUserFilter('')}
                className={cn(
                  { 'is-active': activeUserFilter === '' },
                )}
              >
                All
              </a>

              {usersFromServer.map((user) => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => handleUserFilter(user.name)}
                  className={cn(
                    { 'is-active': activeUserFilter === user.name },
                  )}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => {
                const category = findCategoryById(product.categoryId);
                const user = findUserById(category?.ownerId);

                return (
                  <tr>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${category?.icon} - ${category?.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={cn(
                        { 'has-text-link': user?.sex === 'm' },
                        { 'has-text-danger': user?.sex === 'f' },
                      )}
                    >
                      {user?.name}
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
