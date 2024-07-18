module.exclass APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((elm) => delete queryObj[elm]);
      this.query.find(queryObj);
      return this;
    }
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      } else this.query = this.query.sort("-createdAt");
      return this;
    }
    fields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else this.query = this.query.select("-__v");
      return this;
    }
    paginate() {
      const page = +this.queryString.page;
      const limit = +this.queryString.limit;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }