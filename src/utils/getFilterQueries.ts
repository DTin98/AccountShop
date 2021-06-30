import { PAGINATE_DEFAULT } from "src/shared/constants/pagination.constant";
import { FilterDto } from "src/shared/dtos/filter.dto";

export const getFilterQueries = (filter: FilterDto) => {
  const page = +filter.page || PAGINATE_DEFAULT.PAGE;
  const pageSize = +filter.page_size || PAGINATE_DEFAULT.PAGE_SIZE;
  let skip = page * pageSize * +(page !== PAGINATE_DEFAULT.PAGE);
  skip = skip > 0 ? skip - pageSize : skip;

  return { pageSize, page, skip };
};
