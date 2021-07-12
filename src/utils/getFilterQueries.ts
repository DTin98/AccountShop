import { PAGINATE_DEFAULT } from "src/shared/constants/pagination.constant";
import { FilterDto } from "src/shared/dtos/filter.dto";

interface IFilter {
  pageSize: number;
  page: number;
  skip: number;
}
export const getFilterQueries = (filter: FilterDto): IFilter => {
  const page = +filter.page || PAGINATE_DEFAULT.PAGE;
  let pageSize = +filter.page_size || PAGINATE_DEFAULT.PAGE_SIZE;
  let skip = page * pageSize * +(page !== PAGINATE_DEFAULT.PAGE);
  skip = skip > 0 ? skip - pageSize : skip;

  if (page < 0) {
    pageSize = 0;
    skip = 0;
  }

  return { pageSize, page, skip };
};
