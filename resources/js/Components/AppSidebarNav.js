import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'

import {
    CBadge,
    CSidebarNav,
    CNavItem,
    CNavGroup,
    CNavTitle,
} from '@coreui/vue'

import nav from '../_nav';
import { Link } from '@inertiajs/inertia-vue3';

const isActiveLink = (route, link) => {
    if (link === undefined) {
        return false
    }

    return (route === link);
}

const isActiveItem = (route, item) => {
    if (isActiveLink(route, item.to)) {
        return true
    }

    if (item.items) {
        return item.items.some((child) => isActiveItem(route, child))
    }

    return false
}

const AppSidebarNav = defineComponent({
    name: 'AppSidebarNav',
    components: {
        CNavItem,
        CNavGroup,
        CNavTitle,
    },
    props: {
        url: {
            type: String,
        }
    },
    setup(props) {
        const route = props.url
        const firstRender = ref(true)

        onMounted(() => {
            firstRender.value = false
        })

        const renderItem = (item) => {
            if (item.items) {
                return h(
                    CNavGroup,
                    {
                        ...(firstRender.value && {
                            visible: item.items.some((child) => isActiveItem(route, child)),
                        }),
                    },
                    {
                        togglerContent: () => [
                            h(resolveComponent('CIcon'), {
                                customClassName: 'nav-icon',
                                name: item.icon,
                            }),
                            item.name,
                        ],
                        default: () => item.items.map((child) => renderItem(child)),
                    },
                )
            }

            return item.to
                ? h(
                    Link,
                    {
                        to: item.to,
                        custom: true,
                    },
                )
                : h(
                    resolveComponent(item.component),
                    {},
                    {
                        default: () => item.name,
                    },
                )
        }

        return () =>
            h(
                CSidebarNav,
                {},
                {
                    default: () => nav.map((item) => renderItem(item)),
                },
            )
    },
})
export { AppSidebarNav }
