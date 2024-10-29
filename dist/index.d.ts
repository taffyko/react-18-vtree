import React, { ReactElement, ComponentType, Ref, RefCallback, RefObject, PureComponent, ReactNode, Component } from 'react';
import { FixedSizeList, ListChildComponentProps, VariableSizeList, ListProps, Align, FixedSizeListProps, VariableSizeListProps } from 'react-window';

type DefaultTreeProps = TreeProps<NodeData, NodePublicState<NodeData>, FixedSizeList>;
type DefaultTreeState = TreeState<NodeData, NodePublicState<NodeData>, FixedSizeList>;

type NodeData = Readonly<{
    /**
     * Unique ID of the current node.
     */
    id: string;
    /**
     * Default node openness state. If the Tree component performs building a new
     * Tree and the preservePreviousState prop is not set, this value will be used
     * to set the openness state of the node.
     */
    isOpenByDefault: boolean;
}>;
type TreeWalkerValue<TData extends NodeData, TMeta = {}> = Readonly<{
    data: TData;
} & TMeta>;
type OpennessStateUpdateRules<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    open: boolean;
    subtreeCallback?: (node: TNodePublicState, ownerNode: TNodePublicState) => void;
}>;
type NodePublicState<TData extends NodeData> = Readonly<{
    data: TData;
    setOpen: (state: boolean) => Promise<void>;
}> & {
    isOpen: boolean;
};
type NodeRecord<TNodePublicState extends NodePublicState<any>> = Readonly<{
    public: TNodePublicState;
}> & {
    child: NodeRecord<TNodePublicState> | null;
    isShown: boolean;
    parent: NodeRecord<TNodePublicState> | null;
    sibling: NodeRecord<TNodePublicState> | null;
    visited: boolean;
};
type NodeComponentProps<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<Omit<ListChildComponentProps, 'data' | 'index'> & TNodePublicState & {
    /**
     * The data provided by user via `itemData` Tree component property.
     */
    treeData?: any;
}>;
type TreeWalker<TData extends NodeData, TMeta = {}> = () => Generator<TreeWalkerValue<TData, TMeta> | undefined, undefined, TreeWalkerValue<TData, TMeta>>;
type OpennessState<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<Record<string, OpennessStateUpdateRules<TData, TNodePublicState> | boolean>>;
type TreeComputerProps<TData extends NodeData> = Readonly<{
    async?: boolean;
    buildingTaskTimeout?: number;
    placeholder?: ReactNode;
    treeWalker: TreeWalker<TData>;
}>;
type TreeComputerState<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    order?: string[];
    records: ReadonlyMap<string | symbol, NodeRecord<TNodePublicState>>;
    setState: Component<any, TreeComputerState<TData, TNodePublicState>>['setState'];
    updateRequest: object;
}>;
type TreeProps<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TListComponent extends FixedSizeList | VariableSizeList> = Readonly<Omit<ListProps, 'children' | 'itemCount' | 'itemKey'>> & TreeComputerProps<TData> & Readonly<{
    children: ComponentType<NodeComponentProps<TData, TNodePublicState>>;
    listRef?: Ref<TListComponent>;
    rowComponent?: ComponentType<ListChildComponentProps>;
}>;
type TreeState<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TListComponent extends FixedSizeList | VariableSizeList> = TreeComputerState<TData, TNodePublicState> & Readonly<{
    attachRefs: RefCallback<TListComponent>;
    computeTree: TreeComputer<any, any, any, any>;
    list: RefObject<TListComponent>;
    recomputeTree: (options: OpennessState<TData, TNodePublicState>) => Promise<void>;
    treeWalker: TreeWalker<TData>;
}>;
type TypedListChildComponentData<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    /**
     * The Node component provided by the user.
     */
    component: ComponentType<NodeComponentProps<TData, TNodePublicState>>;
    /**
     * The function that returns public data from visible records by index.
     *
     * @param index
     */
    getRecordData: (index: number) => TNodePublicState;
    /**
     * @see NodeComponentProps#treeData
     */
    treeData: any;
}>;
declare const Row: <TData extends Readonly<{
    /**
     * Unique ID of the current node.
     */
    id: string;
    /**
     * Default node openness state. If the Tree component performs building a new
     * Tree and the preservePreviousState prop is not set, this value will be used
     * to set the openness state of the node.
     */
    isOpenByDefault: boolean;
}>, TNodePublicState extends NodePublicState<TData>>({ index, data: { component: Node, getRecordData, treeData }, style, isScrolling, }: React.PropsWithChildren<Readonly<Omit<ListChildComponentProps<any>, "data"> & {
    data: Readonly<{
        /**
         * The Node component provided by the user.
         */
        component: React.ComponentType<Readonly<Omit<ListChildComponentProps<any>, "data" | "index"> & TNodePublicState & {
            /**
             * The data provided by user via `itemData` Tree component property.
             */
            treeData?: any;
        }>>;
        /**
         * The function that returns public data from visible records by index.
         *
         * @param index
         */
        getRecordData: (index: number) => TNodePublicState;
        /**
         * @see NodeComponentProps#treeData
         */
        treeData: any;
    }>;
}>>) => ReactElement | null;
type TreeComputerOptions<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    opennessState?: OpennessState<TData, TNodePublicState>;
    refresh?: boolean;
}>;
type TreeComputer<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TProps extends TreeComputerProps<TData>, TState extends TreeComputerState<TData, TNodePublicState>> = (props: TProps, state: TState, options: TreeComputerOptions<TData, TNodePublicState>) => (Pick<TState, 'order' | 'records'> & Partial<Pick<TState, 'updateRequest'>>) | null;
declare class Tree<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TProps extends TreeProps<TData, TNodePublicState, TListComponent>, TState extends TreeState<TData, TNodePublicState, TListComponent>, TListComponent extends FixedSizeList | VariableSizeList> extends PureComponent<TProps, TState> {
    static defaultProps: Partial<DefaultTreeProps>;
    static getDerivedStateFromProps(props: DefaultTreeProps, state: DefaultTreeState): Partial<DefaultTreeState> | null;
    constructor(props: TProps, context: any);
    getItemData(): TypedListChildComponentData<TData, TNodePublicState>;
    protected getRecordData(index: number): TNodePublicState;
    recomputeTree(state: OpennessState<TData, TNodePublicState>): Promise<void>;
    scrollTo(scrollOffset: number): void;
    scrollToItem(id: string, align?: Align): void;
}

type FixedSizeNodeData = NodeData;
type FixedSizeNodePublicState<TData extends FixedSizeNodeData> = NodePublicState<TData>;
type FixedSizeTreeProps<TData extends FixedSizeNodeData> = TreeProps<TData, FixedSizeNodePublicState<TData>, FixedSizeList> & Readonly<Pick<FixedSizeListProps, 'itemSize'>>;
type FixedSizeTreeState<TData extends FixedSizeNodeData> = TreeState<TData, FixedSizeNodePublicState<TData>, FixedSizeList>;
declare class FixedSizeTree<TData extends FixedSizeNodeData = FixedSizeNodeData> extends Tree<TData, FixedSizeNodePublicState<TData>, FixedSizeTreeProps<TData>, FixedSizeTreeState<TData>, FixedSizeList> {
    constructor(props: FixedSizeTreeProps<TData>, context: any);
    render(): ReactNode;
}

type VariableSizeNodeData = Readonly<{
    /** Default node height. Can be used only with VariableSizeTree */
    defaultHeight: number;
}> & NodeData;
type VariableSizeNodePublicState<T extends VariableSizeNodeData> = NodePublicState<T> & {
    height: number;
    readonly resize: (height: number, shouldForceUpdate?: boolean) => void;
};
type VariableSizeTreeProps<TData extends VariableSizeNodeData> = TreeProps<TData, VariableSizeNodePublicState<TData>, VariableSizeList> & Readonly<{
    itemSize?: VariableSizeListProps['itemSize'];
}>;
type VariableSizeTreeState<T extends VariableSizeNodeData> = TreeState<T, VariableSizeNodePublicState<T>, VariableSizeList> & Readonly<{
    resetAfterId: (id: string, shouldForceUpdate?: boolean) => void;
}>;
declare class VariableSizeTree<TData extends VariableSizeNodeData> extends Tree<TData, VariableSizeNodePublicState<TData>, VariableSizeTreeProps<TData>, VariableSizeTreeState<TData>, VariableSizeList> {
    constructor(props: VariableSizeTreeProps<TData>, context: any);
    resetAfterId(id: string, shouldForceUpdate?: boolean): void;
    recomputeTree(state: OpennessState<TData, VariableSizeNodePublicState<TData>>): Promise<void>;
    render(): ReactNode;
    private getItemSize;
}

export { FixedSizeNodeData, FixedSizeNodePublicState, FixedSizeTree, FixedSizeTreeProps, FixedSizeTreeState, NodeComponentProps, NodePublicState, NodeRecord, Row, TreeWalker, TreeWalkerValue, VariableSizeNodeData, VariableSizeNodePublicState, VariableSizeTree, VariableSizeTreeProps, VariableSizeTreeState };
